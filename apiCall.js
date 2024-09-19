export const apiCall = async (method, url, payload, timeout = 5000) => {
  console.log(method, url, payload);
  let data, response;

  const fetchWithTimeout = (timeout) => {
    return new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Request timed out")), timeout)
    );
  };

  try {
    const fetchPromise = new Promise(async (resolve, reject) => {
      try {
        switch (method) {
          case "GET":
            response = await fetch(url, {
              method: "GET",
              credentials: "include",
            });
            break;
          case "POST":
            response = await fetch(url, {
              method: "POST",
              credentials: "include",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(payload),
            });
            break;
          case "DELETE":
            response = await fetch(url, {
              method: "DELETE",
              credentials: "include",
            });
            break;
          case "FORMDATA":
            const formData = new FormData();
            for (const key in payload) {
              if (payload.hasOwnProperty(key)) {
                formData.append(key, payload[key]);
              }
            }
            response = await fetch(url, {
              method: "POST",
              credentials: "include",
              body: formData,
            });
            break;
          default:
            console.log(`Unsupported method: ${method}`);
        }

        if (response.ok) {
          data = await response.json();
          resolve(data);
        } else {
          reject(new Error("Failed to fetch"));
        }
      } catch (error) {
        reject(error);
      }
    });

    // Race the fetch promise against the timeout promise
    return await Promise.race([fetchPromise, fetchWithTimeout(timeout)]);
  } catch (error) {
    console.log(error, "error");
    // Rethrow the error to be handled by the caller
  }
};

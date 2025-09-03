export async function signInApi(username, password) {
  try {
    const response = await fetch("/api/auth/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    return {
      success: false,
      message: "Network error: " + error.message,
    };
  }
}

export async function checkSessionApi() {
  try {
    const response = await fetch("/api/auth/verify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    return data;
  } catch (error) {
    return {
      success: false,
      message: "Network error: " + error.message,
    };
  }
}

export async function signOutApi() {
  try {
    const response = await fetch("/api/auth/signout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    return data;
  } catch (error) {
    return {
      success: false,
      message: "Network error: " + error.message,
    };
  }
}

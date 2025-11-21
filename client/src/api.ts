import { Dish, LoginResponse, NewUser, Order, User } from "./types";

// GET Dish
export const fetchDish = async (): Promise<Dish[]> => {
  try {
    const response = await fetch(
      "https://restaurant-app-update.onrender.com/dishes"
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data: Dish[] = await response.json();
    return data;
  } catch (e: unknown) {
    if (e instanceof Error) {
      throw new Error(e.message);
    } else {
      throw new Error("An unknown error occurred.");
    }
  }
};

// GET Dish BY Id
export const fetchDishById = async (id: string): Promise<Dish> => {
  //Fetch the single dish
  try {
    const response = await fetch(
      `https://restaurant-app-update.onrender.com/dishes/${id}`
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data: Dish = await response.json();
    return data;
  } catch (e: unknown) {
    if (e instanceof Error) {
      throw new Error(e.message);
    } else {
      throw new Error("An unknown error occurred.");
    }
  }
};

//GET User By Id
export const fetchUserById = async (
  id: string,
  token: string
): Promise<User> => {
  try {
    const response = await fetch(
      `https://restaurant-app-update.onrender.com/users/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!response.ok) {
      throw new Error("Failed to fetch User");
    }

    const data: User = await response.json();
    return data;
  } catch (e: unknown) {
    if (e instanceof Error) {
      throw new Error(e.message);
    } else {
      throw new Error("An unknown error occurred.");
    }
  }
};

//Login
export const login = async (
  username: string,
  password: string
): Promise<LoginResponse> => {
  try {
    const response = await fetch(
      `https://restaurant-app-update.onrender.com/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      }
    );

    if (!response.ok) {
      throw new Error("Login failed");
    }

    const data = await response.json();
    return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("An unknown error occurred.");
    }
  }
};

//Logout
export const logout = () => {
  // Remove the token from localStorage
  localStorage.removeItem("authToken");
};

//POST User
export const createAccount = async (
  username: string,
  password: string,
  name: string,
  email: string,
  phoneNumber: string
): Promise<NewUser> => {
  try {
    const response = await fetch(
      "https://restaurant-app-update.onrender.com/users",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password, name, email, phoneNumber }),
      }
    );
    if (!response.ok) {
      throw new Error("Failed creating user.");
    }
    const data = await response.json();
    return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("An unknown error occurred.");
    }
  }
};

//POST Order
export const createOrder = async (
  token: string,
  time: Date,
  orderStatus: string,
  userId: string,
  orderDishes: { dishId: string; quantity: number }[]
): Promise<Order> => {
  try {
    const response = await fetch(
      "https://restaurant-app-update.onrender.com/orders",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          time: time.toISOString(),
          orderStatus: orderStatus || "Penfing", //Default value
          userId: userId,
          orderDishes: orderDishes,
        }),
      }
    );
    if (!response.ok) {
      throw new Error("Failed creating order.");
    }

    const data = await response.json();
    return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else throw new Error("An unknown error occurred.");
  }
};

//GET Order By UserId
export const fetchOrdersByUserId = async (
  userId: string,
  token: string
): Promise<Order> => {
  try {
    const response = await fetch(
      `https://restaurant-app-update.onrender.com/orders/user/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!response.ok) {
      throw new Error("Failed to fetch Orders or User");
    }

    const data: Order = await response.json();
    return data;
  } catch (e: unknown) {
    if (e instanceof Error) {
      throw new Error(e.message);
    } else {
      throw new Error("An unknown error occurred.");
    }
  }
};

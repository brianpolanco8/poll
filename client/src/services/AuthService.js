import axios from "axios";

export default class AuthService {
  static login = async ({ email, password }) => {
    const graphqlQuery = {
      query: `
            {
              login(email: "${email}", password:"${password}"){
                token
              }
            }
            `,
    };

    try {
      const response = await axios.post(
        "http://localhost:5000/graphql",
        graphqlQuery,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      this.setToken(response.data.data.login.token);
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  static getCurrentUser = async () => {
    const token = localStorage.getItem("token");
    const graphqlQuery = {
      query: `
      {
        currentUser{
          name
        }
      }
      `,
    };

    try {
      const response = await axios.post(
        "http://localhost:5000/graphql",
        graphqlQuery,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  static setToken = (token) => {
    localStorage.setItem("token", token);
  };
}

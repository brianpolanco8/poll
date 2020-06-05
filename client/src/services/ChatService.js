import axios from "axios";

export default class ChatService {
  static getAllMessages = async () => {
    const graphqlQuery = {
      query: `
      {
        getMessages{
        message
        user {
          name
          profilePic
        }
      }
  }
            `,
    };
    return axios.post("http://localhost:5000/graphql", graphqlQuery, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  static sendMessage = async (message) => {
    const token = localStorage.getItem("token");
    const graphqlQuery = {
      query: `
      mutation{
        sendMessage(message: "${message}") {
          _id
        }
      }
      `,
    };
    return axios.post("http://localhost:5000/graphql", graphqlQuery, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  };
}

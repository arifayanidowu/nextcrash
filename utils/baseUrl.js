const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://rs-edge.herokuapp.com"
    : "http://localhost:4000";

export default baseUrl;

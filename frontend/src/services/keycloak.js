import Keycloak from "keycloak-js";

const keycloak = new Keycloak({
  url: "http:keycloak:8081",
  realm: "pokecrawler",
  clientId: "frontend-client",
});

export default keycloak;

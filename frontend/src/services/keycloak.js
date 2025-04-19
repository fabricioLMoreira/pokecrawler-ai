import Keycloak from "keycloak-js";

const keycloak = new Keycloak({
  url: "http://localhost:8180",
  realm: "pokecrawler",
  clientId: "frontend-client",
});

export default keycloak;

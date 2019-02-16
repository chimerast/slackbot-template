import { prepare } from "./lib/prepare";
import { slack } from "./lib/slackappbase";

prepare(import("./resources/locales.yml"));

slack((app, web, rtm) => {
  app.get("/", (req, res) => {
    res.json({ status: "ok" });
  });

  rtm.on("message", (message) => {
    rtm.sendMessage("ok", message.channel);
  });
});

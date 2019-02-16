import { RTMClient, WebClient } from "@slack/client";
import express, { Application } from "express";

export abstract class SlackAppBase {
  protected readonly app: Application;
  protected readonly web: WebClient;
  protected readonly rtm: RTMClient;

  constructor() {
    this.app = express();
    this.web = new WebClient(process.env.SLACK_TOKEN);
    this.rtm = new RTMClient(process.env.SLACK_TOKEN!);
  }

  public async start(port: number) {
    await this.setup();
    await new Promise((resolve) => this.app.listen(port, () => resolve()));
    await this.rtm.start();
  }

  protected abstract async setup(): Promise<void>;
}

export async function slack(app: (app: Application, web: WebClient, rtm: RTMClient) => void) {
  const slackapp = new class extends SlackAppBase {
    protected async setup(): Promise<void> {
      app(this.app, this.web, this.rtm);
    }
  }();

  await slackapp.start(Number(process.env.PORT) || 3000);
}

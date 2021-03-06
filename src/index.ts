import { Application } from "typedoc/dist/lib/application";
import { Converter, Context } from "typedoc/dist/lib/converter";
import { Reflection } from "typedoc/dist/lib/models/reflections";
import { PluginHost } from "typedoc/dist/lib/utils";

export function load(host: PluginHost) {
  const app: Application = host.application;

  app.converter.on(
    Converter.EVENT_CREATE_DECLARATION,
    (_context: Context, reflection: Reflection, node?: any) => {
      if (!node || !node.name || reflection.name !== "default") return;

      reflection.name = node.name.getText();
    }
  );
}

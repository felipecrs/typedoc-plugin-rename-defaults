import { Application } from "typedoc/dist/lib/application";
import { Converter, Context } from "typedoc/dist/lib/converter";
import { Reflection } from "typedoc/dist/lib/models/reflections";

export function load(app: Readonly<Application>) {
  app.converter.on(
    Converter.EVENT_CREATE_DECLARATION,
    (_context: Context, reflection: Reflection, node?: any) => {
      if (!node || !node.name || reflection.name !== "default" || reflection.name !== "export=") return;

      reflection.name = node.name.getText();
    }
  );
}

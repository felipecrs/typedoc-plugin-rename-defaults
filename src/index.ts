import { Application } from "typedoc";
import { Converter, Context } from "typedoc";
import { Reflection } from "typedoc";

export function load(app: Readonly<Application>) {
  app.converter.on(
    Converter.EVENT_CREATE_DECLARATION,
    (_context: Context, reflection: Reflection, node?: any) => {
      if (!node || !node.name || (reflection.name !== "default" && reflection.name !== "export=")) return;

      reflection.name = node.name.getText();
    }
  );
}

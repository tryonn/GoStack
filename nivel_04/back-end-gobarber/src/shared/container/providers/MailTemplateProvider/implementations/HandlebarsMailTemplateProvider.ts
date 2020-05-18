import handlebars from 'handlebars';

import IMailTemplateProvider from "../models/IMailTemplateProvider";
import IParseTemplateMialDTO from "../dtos/IParseTemplateMialDTO";
import fs from 'fs';

class HandlebarsMailTemplateProvider implements IMailTemplateProvider {

  public async parse({ file, variables }: IParseTemplateMialDTO): Promise<string> {

    const templateFileContent = await fs.promises.readFile(file, {
      encoding: 'utf-8',
    });

    const parseTemplate = handlebars.compile(templateFileContent);
    return parseTemplate(variables);
  }

}


export default HandlebarsMailTemplateProvider;

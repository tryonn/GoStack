interface ITemplateVariables {
  [key: string]: string | number;
}

export default interface IParseTemplateMialDTO {

  file: string;
  variables: ITemplateVariables;

}

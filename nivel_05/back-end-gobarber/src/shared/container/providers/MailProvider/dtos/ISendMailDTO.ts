import IParseTemplateMialDTO from "../../MailTemplateProvider/dtos/IParseTemplateMialDTO";

interface ImailContact {
  name: string;
  email: string;
}

export default interface ISendMailDTO {
  to: ImailContact;
  from?: ImailContact;
  templateData: IParseTemplateMialDTO;
  subject: string;
}

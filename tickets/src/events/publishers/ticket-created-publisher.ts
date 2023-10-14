import { Publisher, Subjects, TicketCreatedEvent } from "@metickethub/common";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent>{
  subject: Subjects.TicketCreated = Subjects.TicketCreated;
}
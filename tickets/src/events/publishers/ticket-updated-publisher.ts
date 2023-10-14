import { Publisher, Subjects, TicketUpdatedEvent } from "@metickethub/common";

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent>{
  subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
}


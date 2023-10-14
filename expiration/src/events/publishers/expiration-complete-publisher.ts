import { Subjects, Publisher, ExpirationCompleteEvent } from "@metickethub/common";

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent>{
  subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;
}
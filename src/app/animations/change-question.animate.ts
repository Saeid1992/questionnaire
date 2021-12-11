import {
  animate,
  AnimationTriggerMetadata,
  style,
  transition,
  trigger,
} from '@angular/animations';

export const questionChange: AnimationTriggerMetadata = trigger('questionChange', [
  transition('done => entering', [
    style({
      opacity: 1,
    }),
    animate('500ms', style({ opacity: 0.0 })),
  ]),
]);

import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class IdFilter {
  @Field(/* istanbul ignore next */ () => String, { nullable: true })
  is?: string;
}

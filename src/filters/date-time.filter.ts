import { Field, GraphQLISODateTime, InputType } from '@nestjs/graphql';

const DateTime = GraphQLISODateTime;

@InputType()
export class DateTimeFilter {
  @Field(/* istanbul ignore next */ () => DateTime, { nullable: true })
  is?: Date;

  @Field(/* istanbul ignore next */ () => [DateTime], {
    nullable: 'itemsAndList',
  })
  in?: Array<Date>;

  @Field(/* istanbul ignore next */ () => DateTime, { nullable: true })
  gt?: Date;

  @Field(/* istanbul ignore next */ () => DateTime, { nullable: true })
  lt?: Date;

  @Field(/* istanbul ignore next */ () => DateTime, { nullable: true })
  gte?: Date;

  @Field(/* istanbul ignore next */ () => DateTime, { nullable: true })
  lte?: Date;
}

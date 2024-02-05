import { Field, GraphQLTimestamp, InputType } from '@nestjs/graphql';

const timestamp = GraphQLTimestamp;

@InputType()
export class TimestampFilter {
  @Field(/* istanbul ignore next */ () => timestamp, { nullable: true })
  is?: Date;

  @Field(/* istanbul ignore next */ () => [timestamp], { nullable: true })
  in?: Array<Date>;

  @Field(/* istanbul ignore next */ () => timestamp, { nullable: true })
  gt?: Date;

  @Field(/* istanbul ignore next */ () => timestamp, { nullable: true })
  lt?: Date;

  @Field(/* istanbul ignore next */ () => timestamp, { nullable: true })
  gte?: Date;

  @Field(/* istanbul ignore next */ () => timestamp, { nullable: true })
  lte?: Date;
}

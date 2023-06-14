import { Injectable } from '@nestjs/common'
import * as aws from 'aws-sdk'

@Injectable()
export class S3 {
  constructor() {
    //credentials
    aws.config.update({
      region: 'zzz',
      accessKeyId: 'zzz',
      secretAccessKey: 'zzzz'
    })
  }

  async upload(
    filename: string,
    stream: any,
    bucket: string,
    mimetype: string,
    destinationFilename: string
  ): Promise<string> {
    console.log(Buffer.from(stream.toString()).toJSON())
    const s3 = new aws.S3()
    const s3Params = {
      Bucket: bucket,
      Key: destinationFilename,
      ACL: 'public-read',
      ContentType: mimetype,
      Body: stream
    }

    const { Location } = await s3.upload(s3Params).promise()
    console.log(Location)
    return Location
  }
}

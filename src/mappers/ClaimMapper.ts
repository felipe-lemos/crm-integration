import { response } from 'msw';

export default class ClaimMapper {
  static async mapClaim(claim: any, data: any): Promise<any> {
    const mappedClaim: any = {
      id: claim.id,
      name: claim.name,
      desc: claim.desc,
      orderId: await this.getCustomFieldData('669f7d0d516a997bac368b3e', data),
      claimNumber: await this.getCustomFieldData(
        '668e92134dfeaa3a10872db2',
        data
      ),
      status: await this.getCustomFieldData('668e923dd9a627a423c9bc8f', data),
      accountId: await this.getCustomFieldData(
        '668e92078c85550bc2956050',
        data
      ),
      submissionDate: this.formatDate(
        await this.getCustomFieldData('668e91e57f81eb369ddbb6ec', data)
      ),
      productId: await this.getCustomFieldData(
        '668e91f9b22fea75c5627332',
        data
      ),
    };
    return mappedClaim;
  }

  static formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toDateString();
  }
  static getCustomFieldData(customFieldId: string, data: any): any {
    const customField = data?.find(
      (customField: any) => customField.idCustomField === customFieldId
    );
    const value = this.customFieldValuesToValue(customField);
    return value;
  }

  static customFieldValuesToValue(customField: any): any {
    if (customField.value?.date) {
      return customField.value.date;
    } else if (customField.value?.text) {
      return customField.value?.text;
    } else if (customField.value?.number) {
      return customField.value?.number;
    } else if (customField.idValue) {
      switch (customField.idValue) {
        case '668e99eee31a233d22761391':
          return 'Pending';
        case '668e923dd9a627a423c9bc90':
          return 'Open';
        case '668e99f48873a1b3c48c6973':
          return 'Closed';
        default:
          return null;
      }
    } else {
      return null;
    }
  }
}

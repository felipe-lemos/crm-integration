import { response } from 'msw';

export default class ClaimMapper {
  static async mapClaim(claim: any, data: any): Promise<any> {
    const mappedClaim: any = {
      id: claim.id,
      name: claim.name,
      desc: claim.desc,
      orderId: await this.getCustomFieldData('66a262fbdd79ff44b5dc084e', data),
      claimNumber: await this.getCustomFieldData(
        '66a263c7edf083195012396e',
        data
      ),
      status: await this.getCustomFieldData('66a26330075ba7eddfbaafcf', data),
      accountId: await this.getCustomFieldData(
        '66a263ab17e1b29cd46db9b8',
        data
      ),
      submissionDate: this.formatDate(
        await this.getCustomFieldData('66a263bbab0811325e22bde3', data)
      ),
      productId: await this.getCustomFieldData(
        '66a2639db3ffcb2d0dadb65f',
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
        case '66a26330075ba7eddfbaafd1':
          return 'Pending';
        case '66a26330075ba7eddfbaafd0':
          return 'Open';
        case '66a26330075ba7eddfbaafd2':
          return 'Closed';
        default:
          return null;
      }
    } else {
      return null;
    }
  }
}

export default class ClaimMapper {
  static async mapClaim(claim: any, data: any): Promise<any> {
    const mappedClaim: any = {
      id: claim.id,
      name: claim.name,
      desc: claim.desc,
      customFields: await this.customFieldsToCustomFields(data),
    };
    return mappedClaim;
  }

  static customFieldsToCustomFields(data: any): any {
    const customFields = data?.map((customField: any) => {
      return {
        name: this.customFieldIdToName(customField.idCustomField),
        value: this.customFieldValuesToValue(customField),
      };
    });
    return customFields;
  }
  static customFieldIdToName(id: any): any {
    switch (id) {
      case '668e91f9b22fea75c5627332':
        return 'Product ID';
      case '668e91e57f81eb369ddbb6ec':
        return 'Submission Date';
      case '668e92078c85550bc2956050':
        return 'Account ID';
      case '668e92134dfeaa3a10872db2':
        return 'Claim Number';
      case '668e923dd9a627a423c9bc8f':
        return 'Status';
      default:
        return null;
    }
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

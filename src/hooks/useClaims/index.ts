import { useCallback } from 'react';
import axios from 'axios';
import ClaimMapper from '../../mappers/ClaimMapper';

//import { useClaimsReturn } from './types';

const useClaims = (): any => {
  const getClaims = async () => {
    try {
      const response = await axios.get(
        `https://api.trello.com/1/lists/668e9043328ae49b9d11bf25/cards?key=9d845182749f62c72011eb62429a2a40&token=ATTA858a39128ead69ba1c26d7ff11f23e66379bbd086bc5563c12d713d8844ba16d783FB2D2`
      );
      const data = response.data;

      const mappedClaimData = await Promise.all(
        data.map(async (claim: any) => {
          try {
            const response = await axios.get(
              `https://api.trello.com/1/cards/${claim.id}/customFieldItems?key=9d845182749f62c72011eb62429a2a40&token=ATTA858a39128ead69ba1c26d7ff11f23e66379bbd086bc5563c12d713d8844ba16d783FB2D2`
            );
            const claimData = response.data;

            const mappedClaim = await ClaimMapper.mapClaim(claim, claimData);
            return mappedClaim;
          } catch (error) {
            throw error;
          }
        })
      );
      return mappedClaimData;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  /**
  const getClaimDetails = useCallback(async (claimId: string) => {
    console.log('claimId', claimId);
    const response = await sdk.callAction({
      actionName: 'claims/getClaimDetails',
      payload: { claimId: claimId },
    });
    return response.isError ? {} : response.data;
  }, []);

  const createClaim = useCallback(async (payload: any) => {
    console.log('createClaimPayload:', payload);
    const response = await sdk.callAction({
      actionName: 'claims/createClaim',
      payload: payload,
    });
    return response.isError ? {} : response.data;
  }, []);

  const updateClaim = useCallback(async (payload: any) => {
    console.log('updateClaimPayload:', payload);
    const response = await sdk.callAction({
      actionName: 'claims/updateClaim',
      payload: payload,
    });
    return response.isError ? {} : response.data;
  }, []);
 */
  return { getClaims };
};

export default useClaims;

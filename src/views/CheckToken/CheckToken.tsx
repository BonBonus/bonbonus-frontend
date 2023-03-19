import React, { FC, useEffect, useState } from 'react';
import s from './CheckToken.module.scss';
import { ProgressSpinner } from 'primereact/progressspinner'
import { UpdateLoyaltyPointsCard } from '../../components/UpdateLoyaltyPointsCard/UpdateLoyaltyPointsCard'
import { UserRating } from '../../components/UserRating/UserRating'
import { useAccount } from 'wagmi'
import { Button } from 'primereact/button'
import { toast } from 'react-toastify'
import { useBonBonusContract } from '../../blockchain/contracts/useBonBonusContract'
import { useCalculateTokenRatingContract } from '../../blockchain/contracts/useCalculateTokenRatingContract'
import { LineDemo } from '../../components/Chart/Chart'

export const CheckToken: FC = () => {
  const token = window.location.pathname.split('customer/')[1];
  const [tokenExist, setTokenExist] = useState<boolean | undefined>(undefined)

  const [userLoyaltyPoints, setUserLoyaltyPoints] = useState<number | undefined>(undefined)
  const [userNewRating, setUserNewRating] = useState<number | undefined>(undefined)
  const [newUserLoyaltyPoints, setNewUserLoyaltyPoints] = useState<number | undefined>(undefined)
  const [userLocalRating, setUserLocalRating] = useState<number | undefined>(undefined)
  const [userGlobalRating, setUserGlobalRating] = useState<number | undefined>(undefined)

  const [localRatingHistory, setLocalRatingHistory] = useState<any>(undefined)

  const [isBusiness, setIsBusiness] = useState<boolean | undefined>(undefined)
  const [businessId, setBusinessId] = useState<number | undefined>(undefined)

  const [updatingRating, setUpdatingRating] = useState(false)
  const [isLoyaltyUpdate, setIsLoyaltyUpdate] = useState(false)

  const { address } = useAccount()
  const {
    tokens,
    getAddressProviders,
    getTokenProviderFinalRating,
    getTokenProviderLoyaltyPoints,
    updateTokenLoyaltyPointsByProvider,
    getTokenProviderRatings
  } = useBonBonusContract()

  const { updateTokenRating } = useCalculateTokenRatingContract()

  useEffect(() => {
    const getUserRating = async () => {
      if (token) {
        const res = await tokens(Number(token));
        setTokenExist(res.exists)
        setUserGlobalRating(Number(res.globalRating))
      }
    }
    const checkIfBusiness = async () => {
      if (!address) {
        return
      }
      const res = await getAddressProviders(address)
      setIsBusiness(res?.length > 0)
      setBusinessId(Number(res[0]))
    }
    getUserRating()
    checkIfBusiness()
  }, [token, address]);

  useEffect(() => {
    if (isBusiness && token && businessId) {
      const getInfoUser = async () => {
        const userLocalRatingRes = await getTokenProviderFinalRating(Number(token), businessId)
        const loyaltyPointsRes = await getTokenProviderLoyaltyPoints(Number(token), businessId)
        const localRatingHistoryRes = await getTokenProviderRatings(Number(token), businessId)
        setLocalRatingHistory(localRatingHistoryRes);
        setUserLocalRating(Number(userLocalRatingRes))
        setUserLoyaltyPoints(Number(loyaltyPointsRes))
      }
      getInfoUser()
    }
  }, [businessId, isBusiness])

  const saveRatingHandle = async () => {
    setUpdatingRating(true)
    try {
      if (!token || !businessId || !userNewRating) {
        return
      }
      await updateTokenRating(Number(token), businessId, userNewRating)
      toast.success('Updated!')
    } catch (e: any) {
      toast.error('Unexpected error')
    } finally {
      setUpdatingRating(false)
      setUserNewRating(undefined)
    }
  }

  const updateTokenLoyaltyPoints = async () => {
    if (!token || !businessId || !newUserLoyaltyPoints) {
      return
    }

    try {
      setIsLoyaltyUpdate(true)
      await updateTokenLoyaltyPointsByProvider(Number(token), businessId, newUserLoyaltyPoints)
      setUserLoyaltyPoints(newUserLoyaltyPoints)
      toast.success('Updated!');
    } catch (e: any) {
      toast.error('Unexpected error')
    } finally {
      setIsLoyaltyUpdate(false)
    }
  }

  return (
    <>
      {isBusiness && tokenExist ? (
        <div className={s.container}>
          <div className={s.leftPull}>
            <div className={s.headLeftPull}>
              <div className={s.title}>Rate interaction with user #{token}</div>
              <div className={s.description}>choose star from 1 to 5</div>
            </div>
            <>
              <UserRating rating={userNewRating}
                setRating={setUserNewRating}
                withUpdate />
              <Button loading={updatingRating}
                disabled={userNewRating === undefined}
                onClick={saveRatingHandle}
                className={s.saveBtn} icon="pi pi-check"
                label="Save" />
            </>
            <UpdateLoyaltyPointsCard updateTokenLoyaltyPoints={updateTokenLoyaltyPoints}
              className={s.updateScoreCard}
              isUpdating={isLoyaltyUpdate}
              setUserLoyalPoints={setUserLoyaltyPoints}
              setNewUserLoyaltyPoints={setNewUserLoyaltyPoints}
              userLoyalPoints={userLoyaltyPoints} />
          </div>
          <div className={s.rightPull}>
            <div className={s.rightPullItem}>
              <span className={s.rightPullItemTitle}>Local rating:</span>
              <UserRating setRating={setUserLocalRating} rating={(userLocalRating! / 100) ?? undefined} withUpdate={false} />
            </div>
            <div className={s.rightPullItem}>
              <span className={s.rightPullItemTitle}>Global rating:</span>
              <UserRating setRating={setUserGlobalRating} rating={(userGlobalRating! / 100) ?? undefined} withUpdate={false} />
            </div>
            <div className={s.rightPullItem}>
              <span className={s.rightPullItemTitle}>Rating dynamic (local):</span>
            </div>
          </div>
          <LineDemo localRatingData={localRatingHistory} className={s.chart} />
        </div>
      ) : !tokenExist ? (
        <>It seems that such a token does not exist.</>
      ) : !isBusiness ? (
        <> It seems that you do not have access rights to view this page</>
      ) : (
        <span className={s.noAccessText}>
          <ProgressSpinner />
        </span>
      )}
    </>
  );
};

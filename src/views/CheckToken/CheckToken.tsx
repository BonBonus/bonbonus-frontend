import { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { backend } from '../../api/configs/axios'
import { userApi } from '../../api/userApi'

import s from './CheckToken.module.scss';
import { Button } from 'primereact/button'
import { ProgressSpinner } from 'primereact/progressspinner'

export const CheckToken: React.FC = () => {
  const token = window.location.pathname.split('customer-points/')[1];
  const [noAccessState, setNoAccessState] = useState<boolean | null>(null);
  const [noToken, setNoToken] = useState<boolean | null>(null);
  const [userPoints, setUserPoints] = useState<number>(0);
  const [nodeName, setNodeName] = useState<string>('');
  const [inputValue, setInputValue] = useState<number>(0);
  const ref = useRef<HTMLDivElement>(null);

  const updateUserPoints = async () => {
    try {
      await userApi.setUserLoyaltyPoints(Number(token), Number(inputValue));
      toast.success('Updated!');
      setUserPoints(inputValue);
    } catch (e: any) {
      toast.error('Something went wrong. Please try again');
    }
  };
  useEffect(() => {
    const getLoyaltyPrograms = async () => {
      try {
        const token = window.location.pathname.split('customer-points/')[1];
        const res = await userApi.getUserLoyaltyPoints(Number(token));
        setUserPoints(res.data.points ?? 0);
        setNodeName(res.data.nodeName ?? '');
        setNoAccessState(false);
        setNoToken(false);
      } catch (e: any) {
        if (e.response.status === 404) {
          setNoToken(true);
          setNoAccessState(false);
        }
        if (e.response.status === 403) {
          setNoToken(false);
          setNoAccessState(true);
        }
      }
    };
    if (token) {
      getLoyaltyPrograms();
    }
  }, [token]);

  return (
    <div>
      {noAccessState === false && noToken === false ? (
        <>
          <div className={s.control}>
            <div className={s.title}>Loyalty Programs</div>
          </div>
          <div ref={ref} className={s.qrContainer}>
            <div className={s.content}>
              <div className={s.subtitle}>
                <img src={`${backend.defaults.baseURL}/render/token/${token}`} />
              </div>
              <div className={s.qrTitle}>{`${nodeName} points`}</div>
              <span className={s.points}>{userPoints}</span>
              <div className={s.changeScoreContainer}>
                <input
                  className={s.input}
                  onChange={(e: any) => setInputValue(e.target.value)}
                  type={'number'}
                  placeholder="Enter a new amount of points"
                />
                {inputValue && inputValue !== userPoints ? (
                  <span className={s.hint}>
                    {userPoints > inputValue
                      ? `${Math.abs(userPoints - inputValue)} points will be deducted`
                      : `${Math.abs(userPoints - inputValue)} points will be added`}
                  </span>
                ) : null}
              </div>
              <Button
                disabled={userPoints === inputValue}
                onClick={updateUserPoints}
                className={s.button}
              >
                Update score
              </Button>
            </div>
          </div>
        </>
      ) : noToken === true ? (
        <>It seems that such a token does not exist.</>
      ) : noAccessState === true ? (
        <> It seems that you do not have access rights to view this page</>
      ) : (
        <span className={s.noAccessText}>
          <ProgressSpinner />
        </span>
      )}
    </div>
  );
};

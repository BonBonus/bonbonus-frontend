export interface IUserRating {
  rating: number | undefined,
  setRating: (rating: number | undefined) => void,
  withUpdate?: boolean,
  setCustomRating?: (rating: number) => void,
  className?: string,
}

export interface IUserRating {
  className?: string,
  rating: number | undefined,
  setRating: (rating: number) => void,
}

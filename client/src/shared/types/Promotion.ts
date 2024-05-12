import Gift from "./Gift";

export type RawPromotion = {
  id: number;
  name: string;
  date: string;
  description: string;
  giftsSent: number;
  gift?: Gift;
  daysForGet: number;
  daysForReceive: number;
  nums: string;
};

export default interface Promotion extends RawPromotion {
  gift: Gift;
}

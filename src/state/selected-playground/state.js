import {
  PlaygroundDto,
  ReservationDto,
  ReservationDetailsDto
} from '../../proxy/dtos/classes';

export interface SelectedPlaygroundState {
  current: PlaygroundDto;
  reservationDate: string;
  selectedReservation: ReservationDto;
  reservedHours: ReservationDto[] | null;
  selectedHour: number;
  currentReservation: ReservationDto;
}

export const SelectedPlaygroundInitialState = {
  current: null,
  reservationDate: null,
  selectedReservation: null,
  reservedHours: null,
  selectedHour: null,
  currentReservation: null
};

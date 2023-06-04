import React, { ReactNode, createContext, useState } from 'react';
import { WeddingInfo } from './Models/WeddingInfo';

interface AppContextProps {
  weddingInfo: WeddingInfo;
  setWeddingInfo: React.Dispatch<React.SetStateAction<WeddingInfo>>;
}

const AppContext = createContext<AppContextProps>({
  weddingInfo: {
    weddingDate: new Date(),
    weddingTime: new Date(),
    weddingVenue: {
      name: '',
      wazeLink: '',
      googleMapsLink: '',
    },
    rsvpDate: '',
    brideAndGroomNames: '',
    guests: [{ name: '', gender: 'Other', phoneNumber: '' }],
  },
  setWeddingInfo: () => {},
});


interface AppProviderProps {
  children: ReactNode;
}

const AppProvider = (props: AppProviderProps) => {
  const { children } = props;
  const [weddingInfo, setWeddingInfo] = useState({
    weddingDate: new Date(),
    weddingTime: new Date(),
    weddingVenue: {
      name: '',
      wazeLink: '',
      googleMapsLink: '',
    },
    rsvpDate: '',
    brideAndGroomNames: '',
    guests: [{ name: '', gender: 'Other', phoneNumber: '' }],
  });

  return (
    <AppContext.Provider value={{ weddingInfo, setWeddingInfo }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };

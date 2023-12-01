import React, { useState, useEffect } from 'react';
import { ScheduleComponent, Day, Week, WorkWeek, Month, Inject } from '@syncfusion/ej2-react-schedule';
import { DataManager, WebApiAdaptor } from '@syncfusion/ej2-data';


const NewCal = () => {

    const [data, setData] = useState(new DataManager({
        url: 'https://js.syncfusion.com/demos/ejservices/api/Schedule/LoadData',
        adaptor: new WebApiAdaptor(),
        crossDomain: true
      }));
    
      useEffect(() => {
        // Additional initialization or data fetching logic can go here if needed
      }, []); // empty dependency array ensures useEffect runs only once on mount
    
  return (
    <div>NewCal</div>
  )
}

export default NewCal
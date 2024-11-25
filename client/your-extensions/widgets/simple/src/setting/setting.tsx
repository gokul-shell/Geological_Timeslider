// import { React } from 'jimu-core'
// import { AllWidgetSettingProps } from 'jimu-for-builder'
// import {
//   MapWidgetSelector,
//   SettingSection,
//   SettingRow
// } from "jimu-ui/advanced/setting-components";

// // import defaultMessages from "./translations/default";

// const Setting = (props: AllWidgetSettingProps<any>) => {
//   const onMapWidgetSelected = (useMapWidgetIds: string[]) => {
//     props.onSettingChange({
//       id: props.id,
//       useMapWidgetIds: useMapWidgetIds
//     })
//   }
 
//   return (
//     <div className="widget-setting-demo">
//       <MapWidgetSelector
//         useMapWidgetIds={props.useMapWidgetIds}
//         onSelect={onMapWidgetSelected}
//       />
//     </div>
//   )
// }

// // export default Setting
// import React, { useState, useEffect } from 'react';
// import { AllWidgetSettingProps } from 'jimu-for-builder';
// import { Button, Input, Label } from 'jimu-ui';
// import { CloseOutlined } from '@ant-design/icons';
// import {
//   SettingSection,
//   SettingRow
// } from 'jimu-ui/advanced/setting-components';

// const Setting = (props: AllWidgetSettingProps<any>) => {
//   // const [urllst, setUrllst] = useState([]);
//   // const [urlInput, setUrlInput] = useState('');
//   // const [labelInput, setLabelInput] = useState('');
//   // const [yngage, setyngage] = useState('');
//   // const [oldage, setoldage] = useState('');

//   // useEffect(() => {
//   //   // Fetch the initial data from the server
//   //   fetch('http://localhost:8000/data')
//   //     .then(response => response.json())
//   //     .then(data => setUrllst(data["url"]))
//   //     .catch(error => console.error('Error fetching data:', error));
//   // }, []);
//   const [urllst, setUrllst] = useState([]);
//   const [urlInput, setUrlInput] = useState('');
//   const [labelInput, setLabelInput] = useState('');
//   const [yngage, setyngage] = useState('');
//   const [oldage, setoldage] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const [fetchError, setFetchError] = useState(null);

//   useEffect(() => {
//     setIsLoading(true);   

//     fetch('http://localhost:8000/data')
//       .then(response => response.json())
//       .then(data =>{
//         console.log(data)
//         localStorage.setItem('urllist', JSON.stringify(data));
//         setUrllst(data)
//       } ) // Assuming the 'url' property in the response
//       .catch(error => {
//         console.error('Error fetching data:', error);
//         setFetchError(error);
//       })
//       .finally(() => setIsLoading(false));
//   }, []);

//   const handleUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setUrlInput(event.target.value);
//   };

//   const handleLabelChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setLabelInput(event.target.value);
//   };
//   const handleyngChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setyngage(event.target.value);
//   };
//   const handleoldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setoldage(event.target.value);
//   };

//   const handleAddUrl = () => {
//     if (urlInput && labelInput) {
//       const newUrls = [...urllst, { label: labelInput, url: urlInput ,  Young_age_field:yngage,
//         old_age_field:oldage}];
//       setUrllst(newUrls);
//       setUrlInput('');
//       setLabelInput('');

//       // Save to localStorage and send to server
//       // localStorage.setItem("urllst", JSON.stringify(newUrls));
//       fetch('http://localhost:8000/write', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(newUrls),
//       }).catch(error => console.error('Error posting data:', error));
//     }
//   };

//   const handleRemove = (urlToRemove: string) => {
//     const updatedUrls = urllst.filter(url => url.url !== urlToRemove);
//     setUrllst(updatedUrls);
//     // localStorage.setItem("urllst", JSON.stringify(updatedUrls));

//     // // Optionally, you could also post the updated list to the server
//     fetch('http://localhost:8000/write', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(updatedUrls),
//     }).catch(error => console.error('Error posting data:', error));
//   };

//   return (
//     <div className="widget-setting-demo">
//       <SettingSection
//         className="url-list-section"
//         title="Manage URLs"
//       >
//         <SettingRow>
//           <div className="url-inputs">
//             <Label>URL:</Label>
//             <Input
//               placeholder="Enter URL"
//               value={urlInput}
//               onChange={handleUrlChange}
//               style={{ marginBottom: '10px' }}
//             />
//             <Label>Label:</Label>
//             <Input
//               placeholder="Enter label"
//               value={labelInput}
//               onChange={handleLabelChange}
//               style={{ marginBottom: '10px' }}
//             />
//             <Label>young age field:</Label>
//             <Input
//               placeholder="young age field"
//               value={yngage}
//               onChange={handleyngChange}
//               style={{ marginBottom: '10px' }}
//             />
//             <Label>old age field:</Label>
//             <Input
//               placeholder="old age field"
//               value={oldage}
//               onChange={handleoldChange}
//               style={{ marginBottom: '10px' }}
//             />
//             <Button
//               type="primary"
//               onClick={handleAddUrl}
//               disabled={!urlInput || !labelInput}
//             >
//               Add URL
//             </Button>
//           </div>
//         </SettingRow>

//         <SettingRow>
//           <div className="url-buttons">
//             {urllst.map((urlEntry) => (
//               <div key={urlEntry.url} style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
//                 <Button
//                   type="default"
//                   style={{ marginRight: '10px' }}
//                 >
//                   {urlEntry.label || 'No Label'}
//                 </Button>
//                 <Button
//                   type="tertiary"
//                   onClick={() => handleRemove(urlEntry.url)}
//                 >
//                   <CloseOutlined />
//                 </Button>
//               </div>
//             ))}
//           </div>
//         </SettingRow>
//       </SettingSection>
//     </div>
//   );
// };

// export default Setting;


// import React, { useState, useEffect } from 'react';
// import { AllWidgetSettingProps } from 'jimu-for-builder';
// import { Button, Input, Label } from 'jimu-ui';
// import { CloseOutlined } from '@ant-design/icons';
// import { SettingSection, SettingRow } from 'jimu-ui/advanced/setting-components';

// const Setting = (props: AllWidgetSettingProps<any>) => {
//   const [urllst, setUrllst] = useState([]);
//   const [urlInput, setUrlInput] = useState('');
//   const [labelInput, setLabelInput] = useState('');
//   const [yngage, setyngage] = useState('');
//   const [oldage, setoldage] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const [fetchError, setFetchError] = useState(null);
//   const [selectedValue, setSelectedValue] = useState('');
//   const [options, setOptions] = useState([]);
//   useEffect(() => {
//     setIsLoading(true);
//     const storedOptions = JSON.parse(localStorage.getItem('urllst')) || [];
//     console.log(storedOptions);
//     setOptions(storedOptions);
//     fetch('http://localhost:8000/data')
//       .then(response => response.json())
//       .then(data => {
//         console.log(data);
//         setUrllst(data);
//         props.onSettingChange({
//           id: props.id,
//           config: props.config.set('urllst', data)
//         });
//       })
//       .catch(error => {
//         console.error('Error fetching data:', error);
//         setFetchError(error);
//       })
//       .finally(() => setIsLoading(false));
//   }, []);
//   const handleDropdownChange = (event) => {
//     setSelectedValue(event.target.value);
//   };

//   const handleUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setUrlInput(event.target.value);
//   };

//   const handleLabelChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setLabelInput(event.target.value);
//   };

//   const handleyngChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setyngage(event.target.value);
//   };

//   const handleoldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setoldage(event.target.value);
//   };

//   const handleAddUrl = () => {
//     if (urlInput && labelInput) {
//       const newUrls = [...urllst, { label: labelInput, url: urlInput, Young_age_field: yngage, old_age_field: oldage }];
//       setUrllst(newUrls);
//       setUrlInput('');
//       setLabelInput('');

//       props.onSettingChange({
//         id: props.id,
//         config: props.config.set('urllst', newUrls)
//       });
//       console.log(newUrls)
//       fetch('http://localhost:8000/write', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(newUrls),
//       }).catch(error => console.error('Error posting data:', error));
//     }
//   };

//   const handleRemove = (urlToRemove: string) => {
//     const updatedUrls = urllst.filter(url => url.url !== urlToRemove);
//     setUrllst(updatedUrls);

//     props.onSettingChange({
//       id: props.id,
//       config: props.config.set('urllst', updatedUrls)
//     });

//     fetch('http://localhost:8000/write', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(updatedUrls),
//     }).catch(error => console.error('Error posting data:', error));
//   };

//   return (
//     <div className="widget-setting-demo">
//       <SettingSection className="url-list-section" title="Manage URLs">
//         <SettingRow>
//           <div className="url-inputs">
//             <Label>URL:</Label>
//             <Input
//               placeholder="Enter URL"
//               value={urlInput}
//               onChange={handleUrlChange}
//               style={{ marginBottom: '10px' }}
//             />
//             <Label>Label:</Label>
//             <Input
//               placeholder="Enter label"
//               value={labelInput}
//               onChange={handleLabelChange}
//               style={{ marginBottom: '10px' }}
//             />
//             <Label>young age field:</Label>
//             <Input
//               placeholder="young age field"
//               value={yngage}
//               onChange={handleyngChange}
//               style={{ marginBottom: '10px' }}
//             />
//             <Label>old age field:</Label>
//             <Input
//               placeholder="old age field"
//               value={oldage}
//               onChange={handleoldChange}
//               style={{ marginBottom: '10px' }}
//             />
//             <Button
//               type="primary"
//               onClick={handleAddUrl}
//               disabled={!urlInput || !labelInput}
//             >
//               Add URL
//             </Button>
//           </div>
//         </SettingRow>

//         <SettingRow>
//           <div className="url-buttons">
//             {urllst.map((urlEntry) => (
//               <div key={urlEntry.url} style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
//                 <Button type="default" style={{ marginRight: '10px' }}>
//                   {urlEntry.label || 'No Label'}
//                 </Button>
//                 <Button type="tertiary" onClick={() => handleRemove(urlEntry.url)}>
//                   <CloseOutlined />
//                 </Button>
//               </div>
//             ))}
//           </div>
//         </SettingRow>
//       </SettingSection>
//     </div>
//   );
// };

// export default Setting;


// import React, { useState, useEffect } from 'react';
// import { AllWidgetSettingProps } from 'jimu-for-builder';
// import { Button, Input, Label, Select, Option } from 'jimu-ui';
// import { CloseOutlined } from '@ant-design/icons';
// import { SettingSection, SettingRow } from 'jimu-ui/advanced/setting-components';

// const Setting = (props: AllWidgetSettingProps<any>) => {
//   const [urllst, setUrllst] = useState([]);
//   const [urlInput, setUrlInput] = useState('');
//   const [labelInput, setLabelInput] = useState('');
//   const [yngage, setyngage] = useState('');
//   const [oldage, setoldage] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const [fetchError, setFetchError] = useState(null);
//   const [selectedValue, setSelectedValue] = useState('');
//   const [options, setOptions] = useState([]);

//   useEffect(() => {
//     setIsLoading(true);
//     const storedOptions = JSON.parse(localStorage.getItem('urllst')) || [];
//     console.log(storedOptions);
//     setOptions(storedOptions);
//     fetch('http://localhost:8000/data')
//       .then(response => response.json())
//       .then(data => {
//         console.log(data);
//         setUrllst(data);
//         props.onSettingChange({
//           id: props.id,
//           config: props.config.set('urllst', data)
//         });
//       })
//       .catch(error => {
//         console.error('Error fetching data:', error);
//         setFetchError(error);
//       })
//       .finally(() => setIsLoading(false));
//   }, []);

//   const handleDropdownChange = (event) => {
//     setSelectedValue(event.target.value);
//     setUrlInput(event.target.value);
//   };

//   const handleLabelChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setLabelInput(event.target.value);
//   };

//   const handleyngChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setyngage(event.target.value);
//   };

//   const handleoldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setoldage(event.target.value);
//   };

//   const handleAddUrl = () => {
//     if (urlInput && labelInput) {
//       const newUrls = [...urllst, { label: labelInput, url: urlInput, Young_age_field: yngage, old_age_field: oldage }];
//       setUrllst(newUrls);
//       setUrlInput('');
//       setLabelInput('');

//       props.onSettingChange({
//         id: props.id,
//         config: props.config.set('urllst', newUrls)
//       });
//       console.log(newUrls)
//       fetch('http://localhost:8000/write', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(newUrls),
//       }).catch(error => console.error('Error posting data:', error));
//     }
//   };

//   const handleRemove = (urlToRemove: string) => {
//     const updatedUrls = urllst.filter(url => url.url !== urlToRemove);
//     setUrllst(updatedUrls);

//     props.onSettingChange({
//       id: props.id,
//       config: props.config.set('urllst', updatedUrls)
//     });

//     fetch('http://localhost:8000/write', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(updatedUrls),
//     }).catch(error => console.error('Error posting data:', error));
//   };

//   return (
//     <div className="widget-setting-demo">
//       <SettingSection className="url-list-section" title="Manage URLs">
//         <SettingRow>
//           <div className="url-inputs">
//             <Label>URL:</Label>
//             <Select
//               placeholder="Select URL"
//               value={urlInput}
//               onChange={handleDropdownChange}
//               style={{ marginBottom: '10px' }}
//             >
//               {options.map((option, index) => (
//                 <Option key={index} value={option.url}>
//                   {option.label}
//                 </Option>
//               ))}
//             </Select>
//             <Label>Label:</Label>
//             <Input
//               placeholder="Enter label"
//               value={labelInput}
//               onChange={handleLabelChange}
//               style={{ marginBottom: '10px' }}
//             />
//             <Label>young age field:</Label>
//             <Input
//               placeholder="young age field"
//               value={yngage}
//               onChange={handleyngChange}
//               style={{ marginBottom: '10px' }}
//             />
//             <Label>old age field:</Label>
//             <Input
//               placeholder="old age field"
//               value={oldage}
//               onChange={handleoldChange}
//               style={{ marginBottom: '10px' }}
//             />
//             <Button
//               type="primary"
//               onClick={handleAddUrl}
//               disabled={!urlInput || !labelInput}
//             >
//               Add URL
//             </Button>
//           </div>
//         </SettingRow>

//         <SettingRow>
//           <div className="url-buttons">
//             {urllst.map((urlEntry) => (
//               <div key={urlEntry.url} style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
//                 <Button type="default" style={{ marginRight: '10px' }}>
//                   {urlEntry.label || 'No Label'}
//                 </Button>
//                 <Button type="tertiary" onClick={() => handleRemove(urlEntry.url)}>
//                   <CloseOutlined />
//                 </Button>
//               </div>
//             ))}
//           </div>
//         </SettingRow>
//       </SettingSection>
//     </div>
//   );
// };

// export default Setting;

import React, { useState, useEffect } from 'react';
import { AllWidgetSettingProps } from 'jimu-for-builder';
import { Button, Input, Label, Select, Option } from 'jimu-ui';
import { CloseOutlined } from '@ant-design/icons';
import { SettingSection, SettingRow } from 'jimu-ui/advanced/setting-components';

const Setting = (props: AllWidgetSettingProps<any>) => {
  const [urllst, setUrllst] = useState([]);
  const [urlInput, setUrlInput] = useState('');
  const [labelInput, setLabelInput] = useState('');
  const [yngage, setyngage] = useState('');
  const [oldage, setoldage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [fetchError, setFetchError] = useState(null);
  const [selectedValue, setSelectedValue] = useState('');
  const [options, setOptions] = useState([]);
  const [fields, setFields] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    const storedOptions = JSON.parse(localStorage.getItem('urllst')) || [];
    console.log(storedOptions);
    setOptions(storedOptions);
    fetch('http://localhost:8000/data')
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setUrllst(data);
        props.onSettingChange({
          id: props.id,
          config: props.config.set('urllst', data)
        });
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setFetchError(error);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const handleDropdownChange = (event) => {
    const selectedUrl = event.target.value;
    setSelectedValue(selectedUrl);
    setUrlInput(selectedUrl);

    // Fetch fields from the selected URL
    fetch(`${selectedUrl}?f=json`)
      .then(response => response.json())
      .then(data => {
        if (data.fields) {
        
          // setFields(data.fields);
          const dateFields = data.fields.filter(field => field.type === 'esriFieldTypeDouble');
          setFields(dateFields.length > 0 ? dateFields : []);
        } else {
          setFields([]);
          console.log(fields)
          console.error('No fields found in the response');
        }
      })
      .catch(error =>  {setFields([]) 
      console.error('Error fetching fields:', error)});
  };

  // const handleLabelChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setLabelInput(event.target.value);
  // };

  const handleyngChange = (event) => {
    setyngage(event.target.value);
  };

  const handleoldChange = (event) => {
    setoldage(event.target.value);
  };

  const handleAddUrl = () => {
    if (urlInput) {
      const newUrls = [...urllst, { label: labelInput, url: urlInput, Young_age_field: yngage, old_age_field: oldage }];
      setUrllst(newUrls);
      setUrlInput('');
      setLabelInput('');

      props.onSettingChange({
        id: props.id,
        config: props.config.set('urllst', newUrls)
      });
      console.log(newUrls)
      fetch('http://localhost:8000/write', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUrls),
      }).catch(error => console.error('Error posting data:', error));
    }
  };

  const handleRemove = (urlToRemove: string) => {
    const updatedUrls = urllst.filter(url => url.url !== urlToRemove);
    setUrllst(updatedUrls);

    props.onSettingChange({
      id: props.id,
      config: props.config.set('urllst', updatedUrls)
    });

    fetch('http://localhost:8000/write', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedUrls),
    }).catch(error => console.error('Error posting data:', error));
  };

  return (
    <div className="widget-setting-demo">
      <SettingSection className="url-list-section" title="Manage URLs">
        <SettingRow>
          <div className="url-inputs">
            <Label>Layers:</Label>
            <Select
              placeholder="Select URL"
              value={urlInput}
              onChange={handleDropdownChange}
              style={{ marginBottom: '10px' }}
            >
              {options.map((option, index) => (
                <Option key={index} value={option.url}>
                  {option.label}
                </Option>
              ))}
            </Select>
            {/* <Label>Label:</Label>
             <Select
         placeholder="Enter label"
         value={labelInput}
         onChange={handleLabelChange}
         style={{ marginBottom: '10px' }}
            >
              {options.map((option, index) => (
                <Option key={index} value={option.label}>
                  {option.label}
                </Option>
              ))}
            </Select> */}
            <Label>Young age field:</Label>
            <Select
              placeholder="Select young age field"
              value={yngage}
              onChange={handleyngChange}
              style={{ marginBottom: '10px' }}
            >
              {fields.map((field, index) => (
                <Option key={index} value={field.name}>
                  {field.alias || field.name}
                </Option>
              ))}
            </Select>
            <Label>Old age field:</Label>
            <Select
              placeholder="Select old age field"
              value={oldage}
              onChange={handleoldChange}
              style={{ marginBottom: '10px' }}
            >
              {fields.map((field, index) => (
                <Option key={index} value={field.name}>
                  {field.alias || field.name}
                </Option>
              ))}
            </Select>
            <Button
              type="primary"
              onClick={handleAddUrl}
              disabled={!urlInput }
            >
              Add URL
            </Button>
          </div>
        </SettingRow>

        <SettingRow>
          <div className="url-buttons">
            {urllst.map((urlEntry) => (
              <div key={urlEntry.url} style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
                <Button type="default" style={{ marginRight: '10px' }}>
                <div>{urlEntry.label || 'No Label'}</div>
                <div>{urlEntry.Young_age_field}</div>
                <div>{urlEntry.old_age_field}</div>
                {/* <span></span>
                <span>{urlEntry.old_age_field}</span> */}
                  {/* {urlEntry.label || 'No Label'} */}
                </Button>
                <Button type="tertiary" onClick={() => handleRemove(urlEntry.url)}>
                  <CloseOutlined />
                </Button>
              </div>
            ))}
          </div>
        </SettingRow>
      </SettingSection>
    </div>
  );
};

export default Setting;

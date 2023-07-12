import React, {useState} from "react";

export interface Param {
    id: number;
    name: string;
    type: 'string';
}

export interface ParamValue {
    paramId: number;
    value: string;
}

interface Model {
    paramValues: ParamValue[];
}

interface Props {
    params: Param[];
    model: Model;
    onChange: (paramValues: ParamValue[]) => void;
}

const ParamInput: React.FC<{ param: Param; value: string; onChange: (value: string) => void }> = ({
                                                                                                      param,
                                                                                                      value,
                                                                                                      onChange,
                                                                                                  }) => {
    return (
        <div>
            <label>{param.name}</label>
            <input type="text" value={value} onChange={(e) => onChange(e.target.value)}/>
        </div>
    );
};

const ParamEditor: React.FC<Props> = ({params, model, onChange}) => {
    const [paramValues, setParamValues] = useState<ParamValue[]>(model.paramValues);

    const handleValueChange = (paramId: number, value: string) => {
        const updatedParamValues = paramValues.map((paramValue) => {
            if (paramValue.paramId === paramId) {
                return {...paramValue, value};
            }
            return paramValue;
        });
        setParamValues(updatedParamValues);
        onChange(updatedParamValues);
    };

    return (
        <div>
            {params.map((param) => (
                <ParamInput
                    key={param.id}
                    param={param}
                    value={paramValues.find((paramValue) => paramValue.paramId === param.id)?.value || ''}
                    onChange={(value) => handleValueChange(param.id, value)}
                />
            ))}
        </div>
    );
};

const params: Param[] = [
    {
        id: 1,
        name: 'Назначение',
        type: 'string',
    },
    {
        id: 2,
        name: 'Длина',
        type: 'string',
    },
];

const model = {
    paramValues: [
        {
            paramId: 1,
            value: 'повседневное',
        },
        {
            paramId: 2,
            value: 'макси',
        },
    ],
};

const App = () => {

    const handleParamValuesChange = (paramValues: ParamValue[]) => {
        console.log(paramValues);
    }

    return (
        <ParamEditor
            params={params}
            model={model}
            onChange={handleParamValuesChange}
        />
    )
};

export default App;

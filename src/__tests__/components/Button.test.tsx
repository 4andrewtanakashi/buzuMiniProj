import React from "react";
import {render} from  '@testing-library/react-native';
import { Button } from "../../components/Button";

describe('Testando o Botão', () => {

    it("Testando valor no botão (Cadastro)", () => {
    
        const {debug, getByText} = render(     
            <Button value={"Cadastro"}  />
        );
        const text = getByText("Cadastro");
        expect(text).toBeTruthy();
        debug();
    });

    it("Testando valor no botão (undefined)", () => {
        const value : any = undefined;
        const {debug, getByText} = render(     
            <Button value={value}  />
        );
        const text = getByText("");
        expect(text).toBeTruthy();
        debug();
    });


    it("Testando valor no botão (error)", () => {

        const {debug, getByText} = render(     
            <Button value={"Buzu"}  />
        );
        const text = getByText("Busu");
        expect(text).toBeTruthy();
        debug();
    });

    
});
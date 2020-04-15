import React from 'react';
import {Text, ScrollView} from 'react-native';
//import { WebView } from 'react-native-webview';

export const Terminos = () => {
    return (
        
    <ScrollView style={{paddingRight: 10}}>
            <Text style={{fontSize: 18, textAlign:'center', fontWeight: 'bold'}}>Términos y condiciones{"\n"}</Text>
            <Text style={{textAlign:'justify'}}>
            Al acceder y utilizar este servicio, usted acepta y accede a estar obligado por los términos y disposiciones de este acuerdo. Asimismo, al utilizar estos servicios particulares, usted estará sujeto a toda regla o guía de uso correspondiente que se haya publicado para dichos servicios. Toda participación en este servicio constituirá la aceptación de este acuerdo. Si no acepta cumplir con lo anterior, por favor, no lo utilice.
            {"\n\n"}
            Los términos y condiciones de uso están dispuestos por los siguientes ítems.{"\n"}
            </Text>
            <Text style={{fontWeight: 'bold'}}>Política de privacidad</Text>
            <Text style={{textAlign:'justify'}}>
            La aplicación recolectara información a través del servicio de correo office365 o outlook, la información recolectada es cedida de forma voluntaria cuando usted acepto los términos y condiciones de uso. La información recolectada es la siguiente:{"\n"}
            </Text>
            <Text style={{textAlign:'justify'}}>
            •	Nombre{"\n"}
            •	Correo electrónico{"\n"}
            •	Organización, departamento o facultad a la que pertenece{"\n\n"}
            La información será utilizada para proporcionar el servicio por la cual fue cedida.{"\n"}
            </Text>
            <Text style={{fontWeight: 'bold'}}>Contenido aceptable</Text>
            <Text style={{textAlign:'justify'}}>
            El uso de la aplicación como medio de distribución de material ofensivo, difamatorio o ilegal está prohibido, en caso de que esto llegue a suceder los autores de la aplicación se reservan el derecho de bloquear, eliminar o restringir el acceso al usuario que haya incurrido en cualquiera de las faltas nombradas anteriormente.{"\n"}
            </Text>
            <Text style={{fontWeight: 'bold'}}>Uso aceptable</Text>
            <Text style={{textAlign:'justify'}}>
            El usuario acepta que está prohibido el uso de la aplicación como medio de acoso o molestia a otros usuarios, en caso de que esto llegue a suceder los autores de la aplicación se reservan el derecho de bloquear, eliminar o restringir el acceso al usuario que haya incurrido en cualquiera de las faltas nombradas anteriormente.{"\n"}
            </Text>
            <Text style={{fontWeight: 'bold'}}>Limitación de responsabilidad</Text>
            <Text style={{textAlign:'justify'}}>
            La aplicación y los autores de esta no se hacen responsables por cualquier daño directo, indirecto, especial o emergente que surja del uso o la imposibilidad de usar cualquiera de los servicios.{"\n"}
            </Text>
            <Text style={{fontWeight: 'bold'}}>Modificación</Text>
            <Text style={{textAlign:'justify'}}>
            Los autores de la aplicación se reservan el derecho de revisar los términos y condiciones de uso en cualquier momento. Dicha revisión entrará en vigencia y será vinculante justo después de que estos sean subidos en el apartado de términos y condiciones de uso de la aplicación.{"\n"}
            </Text>
            <Text style={{fontWeight: 'bold'}}>Ley Aplicable</Text>
            <Text style={{textAlign:'justify'}}>
            El contrato que contemplan estos términos y condiciones de uso se regirá en todos los extremos por las leyes colombianas.{"\n"}
            </Text>
    </ScrollView>
    );
}

/*
<WebView
        originWhitelist={['*']}
        source={{ html: '<h1>Hello world</h1>' }}
        />
*/
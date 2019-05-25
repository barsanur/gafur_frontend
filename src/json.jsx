import React from 'react';

class FetchRandomUser extends React.Component{
    state = {
        loading: true,
        name: null,
        charCode: null,
        numCode: null

    };

    async componentDidMount(){
        const url = 'https://www.cbr-xml-daily.ru/daily_json.js'
        const response = await fetch(url)
        const data = await response.json();
        this.setState({name: data.Valute.AZN.Name, charCode: data.Valute.AZN.CharCode})
        console.log(data)
        // alert(response.headers.get('statusText'))
    };
    render(){
        return(

            <div>
                <h1> {this.state.data}</h1>
                <h1>Valute : {this.state.name}</h1>
                <h1>Code: {this.state.charCode}</h1>

                {this.state.loading ? <div> loading ... </div> : <div>person..</div>}
            </div>
        )
    }
}
export default FetchRandomUser
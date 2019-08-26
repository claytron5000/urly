import React from "react"

export default class Main extends React.Component {

    constructor(props) {

        super(props);
        this.state = { shortUrl: null };
        this.fakeClick = this.fakeClick.bind(this)

    }

    submit(e) {

        e.preventDefault();
        const formData = new FormData(e.target)

        fetch('/api/v1/urls', {
            method: 'POST',
            body: formData,
        })
            .then(res => res.json())
            .then(data => {
                this.setState({ shortUrl: `${window.location.origin}/${data.shortened_url}` })
            })
            .catch(err => { console.log('ERROR: ', err) })

        return false;

    }

    copy(e) {

        e.preventDefault()
        const input = document.getElementById("url");
        input.select();
        document.execCommand("copy");

        return false
    }

    fakeClick() {

        window.location = this.state.shortUrl

    }

    render() {
        const pageTitle = this.state.shortUrl ? "Copy this Url" : "Create a Short Url";
        const link = this.state.shortUrl
            ?
            <form onSubmit={e => this.copy(e)}>
                <input onChange={() => { }} onClick={this.fakeClick} id="url" value={this.state.shortUrl} type="text" />
                <button>Copy</button>

            </form>
            :
            null
        return (
            <main>
                <h1>{pageTitle}</h1>
                <form onSubmit={e => this.submit(e)}>
                    <label htmlFor="target_url">Shorten this Url</label>
                    <input type="text" id="target_url" name="url[target_url]" />
                    <button>Shorten It!</button>
                </form>
                {link}
            </main >
        )
    }
}
import React from "react"

export default class Main extends React.Component {

    constructor(props) {

        super(props);
        this.state = { shortUrl: null };

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
        const input = document.querySelector("#url")
        // In order to properly select the content of the input, we make it type text.
        input.type = 'text'
        input.select()
        document.execCommand("copy")
        input.type = 'hidden'

        return false
    }

    render() {
        const pageTitle = this.state.shortUrl ? "Copy this Url" : "Create a Short Url";
        const link = this.state.shortUrl
            ?
            <form className={"copy-link"} onSubmit={e => this.copy(e)}>
                <a href={this.state.shortUrl}>{this.state.shortUrl}</a>
                <input id="url" value={this.state.shortUrl} type="hidden" />
                <button>Copy</button>

            </form>
            :
            null
        return (
            <main>
                <h1>{pageTitle}</h1>
                <form className={"shortener"} onSubmit={e => this.submit(e)}>
                    <label htmlFor="target_url">Shorten this Url</label>
                    <input type="text" id="target_url" name="url[target_url]" />
                    <button>Shorten It!</button>
                </form>
                {link}
            </main >
        )
    }
}
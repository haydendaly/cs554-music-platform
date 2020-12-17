import React from "react"
import { Link } from "react-router-dom"

const Holder = ({ link, name, images, artists }) => (
    <Link to={link} className="post-body-song shadow">
        <div className="post-body-song-icon shadow">
            <img
                alt={`${name}`}
                src={
                    images.length > 0
                        ? images[0].url
                        : 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/i/e7981d38-6ee3-496d-a6c0-8710745bdbfc/db6zlbs-68b8cd4f-bf6b-4d39-b9a7-7475cade812f.png'
                }
                style={{ width: '100%' }}
            />
        </div>
        <div className="post-body-song-info">
            <p className="post-body-song-title">
                {name.length > 35 ? name.slice(0, 35) + '...' : name}
            </p>
            <p className="post-body-song-artist">
                {artists.length > 35 ? artists.slice(0, 35) + '...' : artists}
            </p>
        </div>
    </Link>
)

const center = {
    width: "100%",
    display: "flex",
    alignItems: "center"
}

const Song = (props) => {
    const { data } = props
    if (data && data.type === 'album') {
        return (
            <Holder
                link={`/album/${data.id}`}
                name={data.name}
                images={data.images}
                artists={data.artists.map((o) => o.name).join(', ')}
            />
        )
    } else if (data && data.type === 'track') {
        return (
            <Holder
                link={`/track/${data.id}`}
                name={data.name}
                images={data.album.images}
                artists={data.artists.map((o) => o.name).join(', ')}
            />
        )
    } else if (data && data.type === 'playlist') {
        return (
            <Holder
                link={`/playlist/${data.id}`}
                name={data.name}
                images={data.images}
                artists={data.owner.display_name}
            />
        )
    } else if (data && data.type === 'artist') {
        return (
            <Holder
                link={`/artist/${data.id}`}
                name={data.name}
                images={data.images}
                artists={'Artist'}
            />
        )
    } else {
        return null
    }
}

export default Song;
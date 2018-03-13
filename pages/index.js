import React from 'react'
import Head from 'next/head'         //用于给页面添加head标签
import Link from 'next/link'         //用于路由
import Router from 'next/router'
import dynamic from 'next/dynamic'  // 动态加载
const Box = dynamic(import('../component/Box'))
export default class extends React.Component {
    //返回初始的props， plain Object
    //For the initial page load, getInitialProps will execute on the server only. getInitialProps will only be executed on the client when navigating to a different route via the Link component or using the routing APIs.
    //Note: getInitialProps can not be used in children components. Only in pages.
    static async getInitialProps ({req}) {
        Router.onRouteChangeStart = url => {
            console.log('App is changing to: ', url)
        }
        const userAgent = req ? req.headers['user-agent'] : navigator.userAgent
        return {userAgent}
    }



    render () {
        return (
            <div>
                <Head>
                    <title>My page title</title>
                    <meta name="viewport" content="initial-scale=1.0, width=device-width" key="viewport"/>
                </Head>
                <Head>
                    {/*key 相同的会覆盖*/}
                    <meta name="viewport" content="initial-scale=1.2, width=device-width" key="viewport"/>
                </Head>
                <p>Hello world {this.props.userAgent}!</p>
                <div>
                    Click{' '}
                    {/*<Link href={{ pathname: '/about', query: { name: 'Zeit' } }}>*/}
                    <Link href="/images">
                        <a>here</a>
                    </Link>{' '}
                    to read more
                </div>
                <button onClick={this.goToImagePage}>click</button>
                <Box>这是一个动态加载的组件</Box>
            </div>
        )
    }

    goToImagePage=()=>{
        console.log(11)
        Router.push({
            pathname: '/images',
            query: { name: 'Zeit' }
        })

    }
}

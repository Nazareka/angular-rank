import React, { useEffect } from 'react';
import './App.scss';
import axios from 'axios';

const App = () => {


    useEffect(() => {

        const fetchData = async () => {
            try {
                const AngularOrgData = await axios.get('https://api.github.com/orgs/angular', {
                    headers: {
                        'Authorization': `token 769a617917dc9d2975f088b98b2a46017a55403a`
                    }
                });
                const CountPublicRepos = AngularOrgData.data.public_repos;
                let promises = []; 
                for (let i = 1; i <= Math.ceil(CountPublicRepos / 100); i++) {
                    promises.push(axios.get(`https://api.github.com/orgs/angular/repos?per_page=100&page=${i}`, {
                        headers: {
                            'Authorization': `token 769a617917dc9d2975f088b98b2a46017a55403a`
                        }
                    }));
                }
                let reposes: any[] = [];
                const data = await Promise.all(promises);
                data.forEach(array => {
                    reposes = reposes.concat(array.data);
                });
                let promisesRepos: any[] = [];
                
                reposes.forEach(repos => {
                    promisesRepos.push(axios.get(`https://api.github.com/repos/angular/${repos.name}/contributors`, {
                        headers: {
                            'Authorization': `token 769a617917dc9d2975f088b98b2a46017a55403a`
                        }
                    }));
                });
                const contributorsData = await Promise.all(promisesRepos);
                console.log(contributorsData);
                const kek = '';

            } catch (error) {
                console.error(error);
            }
        }

        fetchData();
    }, [])



    return (
        <div className="App">
            kek
        </div>
    );
}

export default App;

import React, { useState, useEffect } from 'react';
import FileList from '../FileList/FileList';
import './Main.css';
import { FaLanguage, FaStar } from 'react-icons/fa';
import { Dropbox } from 'dropbox';


const Main = ({
	localToken,
	documents,
	updateDocs,
	updateModalType,
	updateModals,
	updateItemName,
	updateItemId,
	favorites,
	updateFavorite
}) => {
	const [ tab, updateTab ] = useState('name');
	console.log(localToken);

<<<<<<< HEAD
=======

>>>>>>> e6eda7602b18b88d3db38872a696a98d46b6a867
	useEffect(
		() => {
			let dropbox = new Dropbox({ accessToken: localToken });
			dropbox
				.filesListFolder({ path: '' })
				.then((response) => {
					console.log('resonse.entries', response.entries);
					updateDocs(response.entries); // update in state
					return response.entries;
				})
				.then((docs) => {
					// adding a new key to the data, to be able to control the check button next to the list
					let datas = [ ...docs ];
					datas.map((data) => {
						return (data.favorite = false);
					});
					// save the data with the new key
					updateDocs(datas);
				});
		},
		[ localToken, updateDocs ]
	);

	const showTab = (tabName) => {
		updateTab(tabName);
	};

	let tabActiveStyle = {
		backgroundColor: 'rgb(235, 235, 235)',
		color: 'rgb(34, 138, 208)'
	};

	const getLinkToFile = (path) => {
		let dropbox = new Dropbox({ accessToken: localToken });

		dropbox
			.filesGetTemporaryLink({ path: path })
			.then((response) => {
				window.location.href = response.link;
			})
			.catch(function(error) {
				console.error(error, 'Error by downloading file');
			});
	};
	console.log(documents);

	return (
		<main>
			<div className="titleBar">
				<div className="tabsCtn">
					<div className="tabs" style={tab === 'name' ? tabActiveStyle : {}} onClick={() => showTab('name')}>
						<p>Name</p>
						<FaLanguage />
					</div>
					<div
						className="tabs"
						style={tab === 'stared' ? tabActiveStyle : {}}
						onClick={() => showTab('stared')}
					>
						<p>Stared</p>
						<FaStar />
					</div>
				</div>
				<div className="tagCtn">
					<p className="metaTag">MetaData</p>
					<p className="modifiedTag">Modified</p>
				</div>
			</div>
			<ul>
				{/* map out the FileLsit, now just example*/}
				{Array.from(documents).map((doc) => {
					return (
						<FileList
							key={doc.id}
							doc={doc}
							getLinkToFile={getLinkToFile}
							updateModalType={updateModalType}
							updateModals={updateModals}
							updateItemId={updateItemId}
							updateItemName={updateItemName}
							favorites={favorites}
							updateFavorite={updateFavorite}
						/>
					);
				})}
			</ul>
		</main>
	);
};

export default Main;

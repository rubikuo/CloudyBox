import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Redirect } from "react-router-dom";
import FileList from '../FileList/FileList';
import './Main.css';
import { FaFolder, FaStar } from 'react-icons/fa';
import { Dropbox } from 'dropbox';
import { toggleFavorite, removeFavoriteByPath } from '../store';

const Main = ({
	localToken,
	documents,
	updateDocs,
	updateItemName,
	updateItemId,
	favorites,
	updateFavorite,
	updateRename, 
	location
}) => {
	const [ tab, updateTab ] = useState('name');
	const [ errorStatus, updateErrorStatus] = useState(false)
	const [ redirectToHome, updateRedirectToHome] = useState(false)
	//console.log(localToken);

	useEffect(
		() => {
			console.log('location Name', location.pathname);
			
			let dropbox = new Dropbox({ accessToken: localToken });

			if (location.pathname === '/home') {
				dropbox
					.filesListFolder({ path: '' })
					.then((response) => {
						console.log('resonse.entries', response.entries);
						updateDocs(response.entries); // update in state
						updateErrorStatus(false);
						updateTab("name");
						return response.entries;
					});
			} else {
				//console.log('this is not a home, link is', location.pathname);
				let newPath = location.pathname.slice(5);
				console.log(newPath);
				dropbox
					.filesListFolder({ path: newPath })
					.then((response) => {
						// console.log('resonse.entries', response.entries);
						updateDocs(response.entries); // update in state
						updateErrorStatus(false);
						updateTab("name");
						return response.entries;
					})
					.catch((response) => {
						//console.log(response.error.error_summary);
						removeFavoriteByPath(newPath)
						updateErrorStatus(true)
					})
			}
		},
		[ location.pathname, localToken, updateDocs ]
	);

	const showTab = (tabName) => {
		updateTab(tabName);
	};

	let tabActiveStyle = {
		backgroundColor: '#F7F7F7',
		color: 'rgb(34, 138, 208)'
	};

	const getLinkToFile = (path) => {
		console.log(path);
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



	let arrayPrint;

	if (tab === "name"){
		arrayPrint = documents.map(doc => {
			return <FileList
						key={doc.id}
						doc={doc}
						getLinkToFile={getLinkToFile}
						updateItemId={updateItemId}
						updateItemName={updateItemName}
						favorites={favorites}
						updateFavorite={updateFavorite}
						updateRename={updateRename}
						location={location}
						documents={documents}
						updateDocs={updateDocs}
						tab={tab}
					/>
		})
	} else if (tab === "stared"){
		arrayPrint = favorites.map(docFav => {
			return <FileList
						key={docFav.id}
						doc={docFav}
						getLinkToFile={getLinkToFile}
						updateItemId={updateItemId}
						updateItemName={updateItemName}
						favorites={favorites}
						updateFavorite={updateFavorite}
						updateRename={updateRename} 
						location={location}
						documents={documents}
						updateDocs={updateDocs}
						tab={tab}
					/>
		})
	}



const closeErrorMessages = () => {
	/* let newPath = location.pathname.slice(5);
	removeFavoriteByPath(newPath); */
	updateErrorStatus(false);
	updateRedirectToHome(true)
}

if (redirectToHome) {
	return <Redirect to="/home" />;
} 

if(errorStatus){
	return ReactDOM.createPortal(
		<div className="modalContainer">
			{/*same className for the modalContainer, 
		modalHeadline, modalButtons and blueButton here 
		and in Remove.js, same classNames for the buttons as well */}
			<div className="modalBox">
				<div className="modalHeadline">
					<FaFolder style={{ position: 'relative', top: '0px', color: '#1293D6', marginRight: '3px' }} />
					<h5>Error!</h5>
				</div>
				<div>
					<p>The file/folder is not exist or already been removed.</p>
				</div>
				<button onClick={closeErrorMessages}>Back to Home</button>
			</div>
		</div>,
		document.body
	);
}

	return (
		<main>
			<div className="titleBar">
				<div className="tabsCtn">
					<div className="tabs" style={tab === 'name' ? tabActiveStyle : {}} onClick={() => showTab('name')}>
						<p>All Files</p>
					</div>
					<div
						className="tabs"
						style={tab === 'stared' ? tabActiveStyle : {}}
						onClick={() => showTab('stared')}
					>
						<p>Starred</p>
						<FaStar size="18px" style={{ position: 'relative', top: '-1px' }} />
					</div>
				</div>
				<div className="tagCtn">
					<p className="metaTag">Size</p>
					<p className="modifiedTag">Modified</p>
				</div>
			</div>
			<ul>
				{arrayPrint}
			</ul>
		</main>
	);
};

export default Main;

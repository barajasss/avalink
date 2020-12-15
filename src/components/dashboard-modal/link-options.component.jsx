import DashboardLinkItem from '../dashboard-link-item/dashboard-link-item.component'
const LinkOptions = ({ openLinkEditor }) => (
	<div>
		<h4>Add a social link to your profile</h4>
		<hr />
		<div className='link-grid'>
			<DashboardLinkItem onClick={() => openLinkEditor('twitter')}>
				Twitter
			</DashboardLinkItem>
			<DashboardLinkItem>Facebook</DashboardLinkItem>
			<DashboardLinkItem>Gmail</DashboardLinkItem>
			<DashboardLinkItem>Twitch</DashboardLinkItem>
			<DashboardLinkItem>Twitch</DashboardLinkItem>
			<DashboardLinkItem>Twitch</DashboardLinkItem>
			<DashboardLinkItem>Twitch</DashboardLinkItem>
			<DashboardLinkItem>Twitch</DashboardLinkItem>
			<DashboardLinkItem>Twitch</DashboardLinkItem>
		</div>
	</div>
)

export default LinkOptions

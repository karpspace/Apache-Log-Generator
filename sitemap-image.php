<?php 
$images = array();
$domain = $_SERVER['SERVER_NAME'];
$path = 'images/';
$handle = opendir($path);
while ($entry = readdir($handle)) {
	if (($entry != '.') && ($entry != '..')) {
		if (!is_dir($path.$entry)) {
			$ext = strtolower(substr(strrchr($entry, '.'), 1));
			if (in_array($ext, array('jpg', 'jpeg', 'png', 'gif'))) { $images[] = $entry; }
		}
	}
}
closedir($handle);

//now display the XML sitemap
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
header('Last-Modified: '.gmdate('D, d M Y H:i:s').'GMT');
header('Cache-Control: no-cache, must-revalidate');
header('Pragma: no-cache');
header('Content-type:text/xml; charset=utf-8');

echo '<?xml version="1.0" encoding="UTF-8"?>';
echo '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">';
echo '<url>';
echo '<loc>http://' .$domain. '/index.html</loc>';
if ($images) {
	foreach ($images as $image) {
		echo '<image:image><image:loc>http://' .$domain. '/images/'.$image.'</image:loc></image:image>';		
	}
}
echo '</url>'; 
echo '</urlset>';
?>
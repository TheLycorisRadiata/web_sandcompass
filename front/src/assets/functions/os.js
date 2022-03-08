/* START - Icons for get_os() */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import { FaWindows, FaApple, FaAndroid, FaLinux } from 'react-icons/fa';
// Unix doesn't have a proper logo, so it'll be represented with #!

const icon_download = <FontAwesomeIcon icon={faDownload} />;
/* END - Icons for get_os() */

const get_bits_system_architecture = () => 
{
    let _64bits_signatures = ['x86_64', 'x86-64', 'Win64', 'x64;', 'amd64', 'AMD64', 'WOW64', 'x64_64', 'ia64', 'sparc64', 'ppc64', 'IRIX64'];
    let _bits = 32, _i, _c;
    let _to_check = [];

    if (window.navigator.cpuClass)
        _to_check.push((window.navigator.cpuClass + '').toLowerCase());
    if (window.navigator.platform)
        _to_check.push((window.navigator.platform + '').toLowerCase());
    if (navigator.userAgent)
        _to_check.push((navigator.userAgent + '').toLowerCase());

    outer_loop:
    for (_c = 0; _c < _to_check.length; _c++)
    {
        for (_i = 0; _i < _64bits_signatures.length; _i++)
        {
            if (_to_check[_c].indexOf(_64bits_signatures[_i].toLowerCase()) !== -1)
            {
               _bits = 64;
               break outer_loop;
            }
        }
    }

    return _bits;
};

const is_32bits_architecture = () => 
{
    return get_bits_system_architecture() === 32;
};

const is_64bits_architecture = () => 
{
    return get_bits_system_architecture() === 64;
};

const get_os = () => 
{
    // "Android" must be before "Linux", because Android systems have "Linux" too
    // "Linux" must be before "X11", because both Linux et Unix systems have "X11"

    let name = '';
    let is_pc = true;
    let icon = icon_download;

    if (navigator.appVersion.indexOf('Win') !== -1)
    {
        name = 'win';
        icon = <FaWindows />;
    }
    else if (navigator.appVersion.indexOf('Mac') !== -1)
    {
        name = 'mac';
        icon = <FaApple />;
    }
    else if (navigator.appVersion.indexOf('iPhone') !== -1)
    {
        name = 'iphone';
        is_pc = false;
        icon = <FaApple />;
    }
    else if (navigator.appVersion.indexOf('Android') !== -1)
    {
        name = 'android';
        is_pc = false;
        icon = <FaAndroid />;
    }
    else if (navigator.appVersion.indexOf('Linux') !== -1)
    {
        name = 'linux';
        icon = <FaLinux />
    }
    else if (navigator.appVersion.indexOf('X11') !== -1)
    {
        name = 'unix';
        icon = '#!';
    }
    else
    {
        is_pc = false;
    }

    if (name === 'win')
        name = is_64bits_architecture() ? 'win64' : 'win32';

    return { name: name, is_pc: is_pc, icon: icon };
};

export
{
    get_bits_system_architecture,
    is_32bits_architecture,
    is_64bits_architecture,
    get_os
};


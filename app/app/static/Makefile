SHELL:=/bin/bash
.ONESHELL:

setup:
	read -p "Escriu el número del ordinador: " numPc
	re='^[0-9]+$$'
	if [ $${#numPc} -lt 1 ] || ! [[ $$numPc =~ $$re ]];
	then
		echo "El número d'ordinador no és vàlid"
		exit 1
	fi

	read -p "Escriu el número del carro: " numCarro
	re='^[0-9]+$$'
	if [ $${#numCarro} -lt 1 ] || ! [[ $$numCarro =~ $$re ]];
	then
		echo "El número de carro no és vàlid"
		exit 1
	fi

	if [ $$numPc -lt 10 ];
	then
		numPc=$$(echo "0$$numPc")
	fi

	newName=$$(echo "carro$${numCarro}Port$${numPc}")

	oldName=$$(cat /etc/hostname)

	sed -i "s/$$oldName/$$newName/" /etc/hostname
	sed -i "s/$$oldName/$$newName/" /etc/hosts

	wget -O/usr/local/bin/submitLogin.py portatils.chverma.com/submitLogin.py
	lliurex-upgrade -u
	cdccli -e
	passwd estudiant -l

	-sudo -uadministrador llx-guest-manager disable
	echo '@reboot /usr/sbin/dmidecode -t system > /tmp/serialnumber' >> /var/spool/cron/crontabs/root
	echo '@reboot /usr/bin/chmod o+r /var/log/syslog' >> /var/spool/cron/crontabs/root
	chmod 600 /var/spool/cron/crontabs/root
	echo '/usr/bin/python3 /usr/local/bin/submitLogin.py' >> /etc/profile
	echo 'INSTALLED!'
clean:
	rm /usr/local/bin/submitLogin.py
	passwd estudiant -u
	oldName=$$(cat /etc/hostname)

	sed -i "s/$$oldName/lliurex-PRL2/" /etc/hostname
	sed -i "s/$$oldName/lliurex-PRL2/" /etc/hosts
	-sudo -uadministrador llx-guest-manager enable
	sed -i "s/@reboot \/usr\/sbin\/dmidecode -t baseboard > \/tmp\/serialnumber//" /var/spool/cron/crontabs/root
	sed -i "s/@reboot \/usr\/bin\/chmod o\+r \/var\/log\/syslog//" /var/spool/cron/crontabs/root
	sed -i "s/\/usr\/bin\/python3 \/usr\/local\/bin\/submitLogin.py//" /etc/profile

#!/usr/bin/env python3
import re
import json
import requests

f = open('/var/log/syslog')
hostname = open('/etc/hostname').read()[0:-1]
x = re.findall('.*Started Session.*', f.read())[-1].split()

dmidecode = open('/tmp/serialnumber')
serialnumber = re.findall('.*Serial Number.*', dmidecode.read())[0].split()[-1]
mes = x[0]
dia = x[1]
hora = x[2]
usuari = x[10][0:-1]

url = 'https://portatils.chverma.com/api/portatils'
jsonObj = {'keyPasswd': 'secret', 'mes': mes, 'dia': dia, 'hora': hora, 'user': usuari, 'hostname': hostname, 'serialnumber': serialnumber}

x = requests.post(url, json = jsonObj)

print(x.text)
